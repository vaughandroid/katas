export function createDependencies() {
  const timeProvider = {
    get currentHourOfDay(): number {
      return new Date().getHours();
    },
  };
  const output = {
    printLine(line: string) {
      console.log(line);
    },
  };
  const exiter = {
    exit() {
      Deno.exit();
    },
  };
  const dependencies = {
    timeProvider,
    output,
    exiter,
  };
  return dependencies;
}
