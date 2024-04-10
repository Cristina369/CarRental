import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  simpleCars = [
    {
      name: 'Car 1',
      description: 'Description of Car 1.',
      image:
        'https://cdn.pixabay.com/photo/2024/03/14/12/56/mercedes-benz-8633119_960_720.png',
    },
    {
      name: 'Car 2',
      description: 'Description of Car 2.',
      image:
        'https://cdn.pixabay.com/photo/2024/03/04/17/14/mercedes-benz-8612753_1280.png',
    },
    {
      name: 'Car 3',
      description: 'Description of Car 2.',
      image:
        'https://cdn.pixabay.com/photo/2022/10/12/17/34/ford-taunus-7517131_1280.png',
    },
    {
      name: 'Car 4',
      description: 'Description of Car 2.',
      image:
        'https://cdn.pixabay.com/photo/2022/09/20/16/06/opel-7468230_1280.png',
    },
  ];

  luxuryCars = [
    {
      name: 'Car 1',
      description: 'Description of Car 1.',
      image:
        'https://cdn.pixabay.com/photo/2024/03/14/12/56/mercedes-benz-8633119_960_720.png',
    },
    {
      name: 'Car 2',
      description: 'Description of Car 2.',
      image:
        'https://cdn.pixabay.com/photo/2024/03/04/17/14/mercedes-benz-8612753_1280.png',
    },
    {
      name: 'Car 3',
      description: 'Description of Car 2.',
      image:
        'https://cdn.pixabay.com/photo/2022/10/12/17/34/ford-taunus-7517131_1280.png',
    },
    {
      name: 'Car 4',
      description: 'Description of Car 2.',
      image:
        'https://cdn.pixabay.com/photo/2022/09/20/16/06/opel-7468230_1280.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
