import {GetDetections} from "./detections";

export const getStyles = async (img, tileSize) => {
    const detections = await GetDetections(img);
    const dimensions = calculateDimensions(img, detections, tileSize);
    const sizesAndMargins = {...formatValuesToStyle(dimensions.newImageSize), ...getMargins(dimensions, tileSize)};
    return {display: 'block', ...sizesAndMargins};
};
const calculateDimensions = (img, detections, tileSize) => {
    return detections.length > 0 ? calculateDimensionsByFaces(img, detections, tileSize) : calculateDimensionsWithoutFace(img, tileSize)
};
const getMargins = (dimensions, tileSize) => {
    return dimensions.facesBox ? getMarginsByFaces(dimensions.facesBox, dimensions.newImageSize, tileSize) : getMarginsWithoutFace(dimensions.newImageSize, tileSize)
};
const calculateDimensionsByFaces = (img, detections, tileSize) => {
    const originalImageSize = {width: img.width, height: img.height};
    const facesBox = getFacesBox(detections, originalImageSize);
    const newImageSize = getImageSizeByFaces(facesBox, tileSize, originalImageSize);
    return {originalImageSize, facesBox, newImageSize}
};
const calculateDimensionsWithoutFace = (img, tileSize) => {
    return {newImageSize: getImageSizeWithoutFaces(img, tileSize)}
};
const getFacesBox = (detections) => {
    let top = 1, left = 1, bottom = 0, right = 0;
    detections.forEach((detection) => {
        top = Math.min(detection.relativeBox.top, top);
        left = Math.min(detection.relativeBox.left, left);
        bottom = Math.max(detection.relativeBox.bottom, bottom);
        right = Math.max(detection.relativeBox.right, right);
    });
    return {top, left, bottom, right};
};
const getImageSizeByFaces = (facesBox, tileSize, originalImageSize) => {
    const paddingFaceFromBorder = 0.75;
    const facesWidth = (facesBox.right - facesBox.left) * originalImageSize.width;
    const facesHeight = (facesBox.bottom - facesBox.top) * originalImageSize.height;
    const ratio = tileSize / Math.max(facesWidth, facesHeight);
    return {
        width: originalImageSize.width * ratio * paddingFaceFromBorder,
        height: originalImageSize.height * ratio * paddingFaceFromBorder
    };
};
const getImageSizeWithoutFaces = (img, tileSize) => {
    return img.width < img.height ? ({
        width: tileSize,
        height: ((img.height / img.width) * tileSize)
    }) : ({width: ((img.width / img.height) * tileSize), height: tileSize});
};
const getMarginsByFaces = (facesBox, newImageSize, tileSize) => {
    const facesWidth = (facesBox.right - facesBox.left) * newImageSize.width;
    const facesHeight = (facesBox.bottom - facesBox.top) * newImageSize.height;
    const faceMarginTop = (tileSize - facesHeight) / 2;
    const faceMarginLeft = (tileSize - facesWidth) / 2;
    const marginTop = Math.min((faceMarginTop - (facesBox.top * newImageSize.height)), 0);
    const marginLeft = Math.min((faceMarginLeft - (facesBox.left * newImageSize.width)), 0);
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
