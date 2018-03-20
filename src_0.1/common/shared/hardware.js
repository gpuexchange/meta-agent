import rawHardware from './hardware.json';

const multipliers = [
  { name: 'bk2b', multiplier: 10 ** 6 },
  { name: 'x11g', multiplier: 10 ** 6 },
  { name: 'gro', multiplier: 10 ** 6 },
  { name: 'cn', multiplier: 1 },
  { name: 'ns', multiplier: 10 ** 3 },
  { name: 'lrev2', multiplier: 10 ** 3 },
  { name: 'bkv', multiplier: 10 ** 6 },
  { name: 'bk14', multiplier: 10 ** 6 },
  { name: 'eq', multiplier: 1 },
  { name: 'eth', multiplier: 10 ** 6 },
  { name: 'lbry', multiplier: 10 ** 6 },
  { name: 'pas', multiplier: 10 ** 6 },
  { name: 'skh', multiplier: 10 ** 6 },
];

const allHardwareSpecs = {};
Object.keys(rawHardware).forEach((hardware) => {
  const hardwareSpec = {};
  multipliers.forEach(({ name: algoName, multiplier }) => {
    hardwareSpec[algoName] = {
      name: algoName,
      hashRate: rawHardware[hardware][`${algoName}_hr`] * multiplier,
      power: rawHardware[hardware],
    };
  });
  allHardwareSpecs[hardware] = hardwareSpec;
});

export default allHardwareSpecs;
