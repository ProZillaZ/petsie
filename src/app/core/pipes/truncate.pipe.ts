import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, args: string, args2:string): string {
        let length = parseInt(args || '20', 10);
        let limiter = args2 || '...';
        if (value.length <= length) {
            return value;
        }
        return value.substring(0, length) + '...';
    }
}
