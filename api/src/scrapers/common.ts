export interface IScraper {
    name: string;
    url: string;
    scrape: (html: string)=> DailyMenu
}

export namespace IScraper {
    type Constructor<T> = {
      new(...args: any[]): T;
      readonly prototype: T;
    }
    const implementations: Constructor<IScraper>[] = [];
    export function GetImplementations(): Constructor<IScraper>[] {
        console.log("Getting");
        return implementations;
    }
    export function register<T extends Constructor<IScraper>>(ctor: T) {
        console.log("Registering");
      implementations.push(ctor);
      return ctor;
    }
  }