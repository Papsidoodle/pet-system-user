import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.page.html',
  styleUrls: ['./vaccines.page.scss'],
})
export class VaccinesPage implements OnInit {

  constructor() { }


  vaccines_cat = [
    { td1: '4th week'  , td2: '1st DW'},
    { td1: '6th week'  , td2: '2nd DW'},
    { td1: '8th week'  , td2: '3rd DW + 1st 4in1'},
    { td1: '10th week' , td2: '4th DW + anti-ticks and fleas'},
    { td1: '12th week' , td2: '2nd 4in1'},
    { td1: '16th week' , td2: 'ARV'},
  ];

  booster_cat = [
    { td1: '* DW', td2: 'every 3 months'},
    { td1: '* Anti-ticks and fleas'  , td2: 'Monthly or quarterly'},
    { td1: '* 4in1'  , td2: 'after 6mos then annually'},
    { td1: '* ARV'  , td2: 'Annually'},
  ];

  vaccines_dog = [
    { td1: '2nd week'   , td2: '1st DW'},
    { td1: '4th week'   , td2: '2nd DW'},
    { td1: '6th week'   , td2: '3rd DW + 1st 5in1'},
    { td1: '8th week'   , td2: '4th DW + 2nd 5in1 + anti-ticks'},
    { td1: '10th week'  , td2: '1st 6in1 or 8in1'},
    { td1: '12th week'  , td2: '2nd 6in1 or 8in1'},
    { td1: '13th week'  , td2: 'ARV'},
    { td1: '14th week'  , td2: '1st KC'},
    { td1: '16th week'  , td2: '2nd KC'},
    { td1: '6 months'   , td2: 'CHW test if ok give proheart'},
  ];

  booster_dog = [
    { td1: '* DW', td2: 'every 3mos.'},
    { td1: '* Anti-ticks and fleas'  , td2: 'bravecto (3mos) nexgard (1mo.)'},
    { td1: '* 5in1/ 6in1 / 8in1'  , td2: 'after 6mos then annually'},
    { td1: '* KC/ARV/Proheart'  , td2: 'Annually'},
  ];

  ngOnInit() {
  }

}
