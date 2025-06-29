import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  vaccines = [
    {
      name: 'Covishield',
      image: '/assets/images/covishield.jpg',
      link: 'https://en.wikipedia.org/wiki/Covishield',
      description: 'Covishield is a COVID-19 vaccine developed by AstraZeneca and Oxford, manufactured by Serum Institute of India.'
    },
    {
      name: 'Covaxin',
      image: '/assets/images/covaxin.jpg',
      link: 'https://en.wikipedia.org/wiki/Covaxin',
      description: 'Covaxin is an inactivated virus-based COVID-19 vaccine developed by Bharat Biotech.'
    },
    {
      name: 'Pfizer-BioNTech',
      image: '/assets/images/pfizer.jpg',
      link: 'https://en.wikipedia.org/wiki/Pfizer%E2%80%93BioNTech_COVID-19_vaccine',
      description: 'Pfizer-BioNTech COVID-19 vaccine is an mRNA vaccine developed by Pfizer and BioNTech.'
    },
    {
      name: 'Moderna',
      image: '/assets/images/moderna.jpg',
      link: 'https://en.wikipedia.org/wiki/Moderna_COVID-19_vaccine',
      description: 'Moderna COVID-19 vaccine is an mRNA vaccine developed by Moderna, Inc.'
    },
    {
      name: 'Sputnik V',
      image: '/assets/images/sputnik.jpg',
      link: 'https://en.wikipedia.org/wiki/Sputnik_V_COVID-19_vaccine',
      description: 'Sputnik V is a viral vector vaccine for COVID-19 developed by the Gamaleya Research Institute.'
    },
    {
      name: 'Johnson & Johnson',
      image: '/assets/images/johnson&johnson.jpg',
      link: 'https://en.wikipedia.org/wiki/Janssen_COVID-19_vaccine',
      description: 'Johnson & Johnson COVID-19 vaccine is a viral vector vaccine developed by Janssen Vaccines.'
    }
  ];
}
