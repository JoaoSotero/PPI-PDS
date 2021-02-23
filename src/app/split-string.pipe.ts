import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "splitString"
})
export class SplitStringPipe implements PipeTransform {
  transform(stringToSplit: string, splitBy: string): Array<string> {
    return stringToSplit.split(splitBy);
  }
}
