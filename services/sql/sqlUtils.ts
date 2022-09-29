export function handleError(err: any) {
  if (err.code === 5) {
    console.log('create table first');
  }
}
