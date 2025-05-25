const buttons = document.querySelectorAll('.mood-btn');
const feedback = document.getElementById('feedback');

const scents = {
  relaxed: 'Lavender',
  focused: 'Peppermint',
  energized: 'Citrus',
  romantic: 'Rose'
};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.getAttribute('data-mood');
    const scent = scents[mood];

    feedback.textContent = `🌬️ Releasing ${scent} scent for a ${mood} mood.`;
    console.log(`Command sent to wristband: Activate ${scent} scent.`);
  });
});

async function connectToWristband() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'BreezeBand' }], // or use services: ['service_uuid']
      optionalServices: ['battery_service'] // example service
    });

    const server = await device.gatt.connect();
    console.log('Connected to wristband:', device.name);

    alert('Bluetooth connection established with wristband!');
    // You can now get services, characteristics and send commands

  } catch (error) {
    console.error('Bluetooth connection failed:', error);
    alert('Failed to connect. Make sure your band is nearby and BLE is on.');
  }
}