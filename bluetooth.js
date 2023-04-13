let bluetoothDevice;
let gattServer;
let characteristics = {};

async function connectToBluetoothDevice() {
  try {
    console.log("Solicitando dispositivo Bluetooth...");
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [
        {
          services: ['heart_rate'], // Substitua pelo serviço específico do Amazfit GTS 2 mini
        },
      ],
    });

    console.log("Conectando ao GATT Server...");
    gattServer = await bluetoothDevice.gatt.connect();

    console.log("Obtendo serviço...");
    const service = await gattServer.getPrimaryService('heart_rate'); // Substitua pelo serviço específico do Amazfit GTS 2 mini

    console.log("Obtendo características...");
    characteristics.heartRate = await service.getCharacteristic('heart_rate_measurement'); // Substitua pelo UUID da característica específica
    // Adicione mais características conforme necessário

    console.log("Bluetooth conectado com sucesso");
    setupEventListeners();
  } catch (error) {
    console.error("Erro ao conectar ao dispositivo Bluetooth:", error);
  }
}

function setupEventListeners() {
  characteristics.heartRate.addEventListener('characteristicvaluechanged', handleHeartRateMeasurement);
  characteristics.heartRate.startNotifications();
  // Adicione mais eventos para outras características conforme necessário
}

function handleHeartRateMeasurement(event) {
  const value = event.target.value;
  const heartRate = value.getUint8(1); // Pode variar de acordo com a especificação do dispositivo
  console.log("Frequência cardíaca:", heartRate);
}

// Chame essa função no arquivo scripts.js para iniciar a conexão Bluetooth
// connectToBluetoothDevice();
