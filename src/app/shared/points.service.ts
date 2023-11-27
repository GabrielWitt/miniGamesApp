import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
    points = 0;
    alien = 1;

    constructor() { }

}