import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  private static MAX_LENGTH = 15;

  transform(value: any, limit: number) : any {
    return value.length > limit ? `${value.substr(0, limit)}...` : value;
  }

  // transform(value: any, ...args): any {
  //   console.log(args);
  //   return value.length > ShortenPipe.MAX_LENGTH ? `${value.substr(0, ShortenPipe.MAX_LENGTH)}...` : value;
  // }

}
