import * as tf from '@tensorflow/tfjs';

export async function loadModel() {
  const model = await tf.loadLayersModel('/model/model.json');
  console.log('Model loaded successfully!');
  return model;
}