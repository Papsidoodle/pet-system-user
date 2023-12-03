import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedicalHistoryService, PetMedicalHistory } from 'src/app/services/medical-history/medical-history.service';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.page.html',
  styleUrls: ['./medical-history.page.scss'],
})
export class MedicalHistoryPage implements OnInit {
  medicalHistories: PetMedicalHistory = {};
  medicalHistorySubs: Subscription;
  userId: string;
  petId: string;

  constructor(
    private actRoute: ActivatedRoute,
    private medicalHistoryService: MedicalHistoryService,

  ) { }

  ngOnInit() {
    const userId = this.actRoute.snapshot.paramMap.get('uid');
    const petId = this.actRoute.snapshot.paramMap.get('petId');
    const medHistoryId = this.actRoute.snapshot.paramMap.get('medicalHistoryId');
    this.medicalHistorySubs = this.medicalHistoryService
      .getMedicalHistoryById(userId, medHistoryId)
      .subscribe((medicalHistory) => {
        medicalHistory.medicalHistoryDate = formatDate(medicalHistory.medicalHistoryDate.toDate());
        this.medicalHistories = medicalHistory;
      });
  }

}
