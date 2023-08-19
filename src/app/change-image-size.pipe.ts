import { Pipe, PipeTransform } from '@angular/core';


/*
Pipe that changes the url of the picsum image so that we have a thumbnail size image instead of
the full size image to optimize application's performance
*/
@Pipe({
  name: 'changeImageSize'
})
export class ChangeImageSizePipe implements PipeTransform {

  transform(value: string): string {
    const url = value;
    let output = url.substring(0, url.lastIndexOf('/') - 4); // remove the default width and height from the url
    return output + '200'; // then add the thumbnail size of 200
  }

}
