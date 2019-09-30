import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import 'hammerjs';
// import { async } from 'q';
// import { type } from 'os';


@Component({
  selector: 'app-page2',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})

export class GalleryPageComponent implements OnInit {
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    
  constructor() { }
  
  ngOnInit() {
    let imagesData: any = [];
  const foo = async function(){
  await fetch('http://localhost:3333/images')
  .then(res => res.json())
  .then(res => res.forEach((img:any) => {
    imagesData.push(
      {
        small: `${img.img}`, 
        medium: `${img.img}`,
        big: `${img.img}`,
      }
    )
  }))
}
foo()
    
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          thumbnailsArrows: true
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
          thumbnailsArrows: true
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
    ];
    this.galleryImages = imagesData
  }


}
