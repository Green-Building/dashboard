export function mapStatusToColor(status) {
  switch(status) {
    case 'active':
      return 'blue';
    case 'maintenance':
      return 'grey';
    case 'inactive':
      return 'red';
    case 'turn-on':
      return 'green';
    case 'turn-off':
      return 'yellow';
    default:
      return 'white';
  }
}

export function getRandomStrokeStyle() {
  const first = Math.round(Math.random() *10 + 1);
  const second = Math.round(Math.random() * 5 +1);
  return `${first}, ${second}`;
}

export function getRandomColor() {
  const rand = Math.round(Math.random() *10 + 1);

  const colors = ['red', 'blue', 'green', 'orange', 'cyan', 'magenta', 'yellow', 'orange', 'gray', 'black', 'brown', '#ADDDE1'];
  console.log('rand is >>>', colors[rand]);
  return colors[rand];
}