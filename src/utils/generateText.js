export async function generateText(model, startString, numGenerate = 100, temperature = 0.6) {
    const vocab = [...new Set(startString)].sort();
    const char2idx = {};
    vocab.forEach((char, idx) => char2idx[char] = idx);
    const idx2char = Array.from(vocab);
  
    let inputEval = tf.tensor2d([startString.split('').map(char => char2idx[char])]);
    let textGenerated = [];
  
    for (let i = 0; i < numGenerate; i++) {
      const predictions = model.predict(inputEval);
      const lastCharLogits = predictions.slice([0, predictions.shape[1] - 1, 0], [1, 1, predictions.shape[2]]);
      const scaledLogits = lastCharLogits.div(tf.scalar(temperature));
      const predictedId = tf.multinomial(scaledLogits, 1).dataSync()[0];
  
      inputEval = tf.tensor2d([[predictedId]]);
      textGenerated.push(idx2char[predictedId]);
  
      if (['.', '!', '?'].includes(idx2char[predictedId])) {
        break;
      }
    }
  
    return startString + textGenerated.join('');
  }