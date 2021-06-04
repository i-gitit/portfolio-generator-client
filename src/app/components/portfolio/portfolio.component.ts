import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css',
              "./assets/vendor/icofont/icofont.min.css",
              "./assets/vendor/boxicons/css/boxicons.min.css",
              "./assets/vendor/venobox/venobox.css",
              "./assets/vendor/owl.carousel/assets/owl.carousel.min.css",
              "./assets/vendor/aos/aos.css",
              "./assets/css/style.css"
            ]
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
