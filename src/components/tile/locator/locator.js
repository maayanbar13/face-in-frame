import {GetFaceDetections} from "./facesDetections";

export const getStyles = async (img, tileSize) => {
    const facesDetections = await GetFaceDetections(img);
    const dimensions = calculateDimensions(img, facesDetections, tileSize);
    const calibrations = {...formatValuesToStyle(dimensions.newImageSize), ...getMargins(dimensions, tileSize)};
    return {display: 'block', ...calibrations};
};
const calculateDimensions = (img, facesDetections, tileSize) => {
    return facesDetections.length > 0 ? calculateDimensionsByFaces(img, facesDetections, tileSize) : calculateDimensionsWithoutFace(img, tileSize)
};
const getMargins = (dimensions, tileSize) => {
    return dimensions.facesBox ? getMarginsByFaces(dimensions.facesBox, dimensions.newImageSize, tileSize) : getMarginsWithoutFace(dimensions.newImageSize, tileSize)
};
const calculateDimensionsByFaces = (img, facesDetections, tileSize) => {
    const originalImageSize = {width: img.width, height: img.height};
    const facesBox = getFacesRectangle(facesDetections, originalImageSize);
    const newImageSize = getImageSizeByFaces(facesBox, tileSize, originalImageSize);
    return {originalImageSize, facesBox, newImageSize}
};
const calculateDimensionsWithoutFace = (img, tileSize) => {
    return {newImageSize: getImageSizeWithoutFaces(img, tileSize)}
};
const getFacesRectangle = (facesDetections) => {
    // because we get from faceDetection a relative values to the entire image
    // we can assign our default values to 1 (if we try to find our min value) or 0 (if we try to find our max value)
    let top = 1, left = 1, bottom = 0, right = 0;
    facesDetections.forEach((detection) => {
        top = Math.min(detection.relativeBox.top, top);
        left = Math.min(detection.relativeBox.left, left);
        bottom = Math.max(detection.relativeBox.bottom, bottom);
        right = Math.max(detection.relativeBox.right, right);
    });

    return {top, left, bottom, right};  // the return values are also relative (numbers between 0-1).
};
const getImageSizeByFaces = (facesBox, tileSize, originalImageSize) => {
    const relativeFaceSizeInTile = 0.7;
    const facesWidth = (facesBox.right - facesBox.left) * originalImageSize.width;
    const facesHeight = (facesBox.bottom - facesBox.top) * originalImageSize.height;
    const FaceToTileRatio = tileSize / Math.max(facesWidth, facesHeight);
    const expectedSizes = {
        width: originalImageSize.width * FaceToTileRatio * relativeFaceSizeInTile,
        height: originalImageSize.height * FaceToTileRatio * relativeFaceSizeInTile
    };
    // in order to prevent cases that make the image to be smaller than tile
    // in that case, just fit image to tile
    return (Math.min(expectedSizes.height, expectedSizes.width) > tileSize) ? expectedSizes : getImageSizeWithoutFaces(expectedSizes, tileSize);

};
const getImageSizeWithoutFaces = (img, tileSize) => {
    return img.width < img.height ? ({
        width: tileSize,
        height: ((img.height / img.width) * tileSize)
    }) : ({width: ((img.width / img.height) * tileSize), height: tileSize});
};
const getMarginsByFaces = (facesRectangle, newImageSize, tileSize) => {
    const facesWidth = (facesRectangle.right - facesRectangle.left) * newImageSize.width;
    const facesHeight = (facesRectangle.bottom - facesRectangle.top) * newImageSize.height;
    const faceMarginTop = (tileSize - facesHeight) / 2;
    const faceMarginLeft = (tileSize - facesWidth) / 2;

    // the image attached to the top left corner
    // in order to center it - the margin should be: (top left of face rectangle) - (face rectangle margin to center)
    const expectedMarginTop = faceMarginTop - (facesRectangle.top * newImageSize.height);
    const expectedMarginLeft = faceMarginLeft - (facesRectangle.left * newImageSize.width);

    // if the image dims is'nt the larger than tile, do not margin!
    // the margin have to be negative (because the image attached to the top left corner)
    const marginTop = newImageSize.height > tileSize ? Math.min(expectedMarginTop, 0) : 0;
    const marginLeft = newImageSize.width > tileSize ? Math.min(expectedMarginLeft, 0) : 0;
    return formatValuesToStyle({marginTop, marginLeft});
};
const getMarginsWithoutFace = (newImageSize, tileSize) => {
    const marginTop = Math.min(((tileSize - newImageSize.height) / 2), 0);
    const marginLeft = Math.min(((tileSize - newImageSize.width) / 2), 0);
    return formatValuesToStyle({marginTop, marginLeft});
};
const formatValuesToStyle = (dims) => {
    const formatted = {};
    Object.keys(dims).map((key) => formatted[key] = dims[key] + "px");
    return formatted;
};
