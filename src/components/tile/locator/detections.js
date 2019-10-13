import {detectAllFaces, loadFaceLandmarkModel, loadFaceRecognitionModel, loadSsdMobilenetv1Model,loadTinyFaceDetectorModel} from "face-api.js";

export const GetDetections = async (img) => {
    const MODEL_URL = '/models';
    await loadSsdMobilenetv1Model(MODEL_URL);
    return await detectAllFaces(img);
};
