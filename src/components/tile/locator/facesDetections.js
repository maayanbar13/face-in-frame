import {detectAllFaces, loadFaceRecognitionModel, loadSsdMobilenetv1Model} from "face-api.js";

const loadModels = async () => {
    const MODEL_URL = '/models';
    await loadSsdMobilenetv1Model(MODEL_URL);
    await loadFaceRecognitionModel(MODEL_URL);
};
loadModels().then(()=>{console.log("models loaded")}).catch(()=>{console.log("models failed")});

export const GetFaceDetections = async (img) => await detectAllFaces(img);
