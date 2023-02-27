import { spawn } from 'child_process';

function chamarScriptPython() {
  const pythonScript = spawn('/Library/Frameworks/Python.framework/Versions/3.10/bin/python3', ['/Users/guilhermevialle/JavaScript/Projects/app/src/pyscripts/ytaudiodl.py', 'https://youtu.be/ZUr3Ylycx7Q', '']);

  pythonScript.stdout.on('data', (data) => {
    console.log(`Saída do script Python: ${data}`);
  });

  pythonScript.stderr.on('data', (data) => {
    console.error(`Erro ao executar o script Python: ${data}`);
  });

  pythonScript.on('close', (code) => {
    console.log(`O script Python foi encerrado com o código de saída: ${code}`);
  });
}


chamarScriptPython()