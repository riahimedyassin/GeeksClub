import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { EventsService } from 'src/app/services/events/events.service';
import { Event } from 'src/app/shared/models/Event.model';
import { User } from 'src/app/shared/models/User.model';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  event!: Event;
  participants!: User[];
  id!: string;
  edit: boolean = false;
  form!: FormGroup;
  saved: boolean = false; // Notification Trigger
  file!: File | undefined;
  addedMember: boolean = false; // Notification Trigger
  confiremd!: boolean | undefined;
  constructor(
    private eventService: EventsService,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cloudinary: CloudinaryService
  ) {}
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.eventService.getSingleEvent(this.id).subscribe((response) => {
      this.event = response.data;
      this.form = this.formBuilder.nonNullable.group({
        title: [response.data.title, [Validators.required]],
        descreption: [
          response.data.descreption,
          [Validators.required, CustomValidator.strings],
        ],
        price: [
          response.data.price,
          [Validators.required, CustomValidator.numeric],
        ],
        reward_point: [
          response.data.reward_point,
          [
            Validators.required,
            CustomValidator.numeric,
            Validators.min(5),
            Validators.max(50),
          ],
        ],
        date: this.formBuilder.group({
          date_start: [response.data.date.date_start, [Validators.required]],
          date_end: [response.data.date.date_end, [Validators.required]],
        }),
        ended: [response.data.ended, [Validators.required]],
        prerequis: this.formBuilder.nonNullable.array(response.data.prerequis),
        categorie: [response.data.categorie, [Validators.required]],
      });
      this.form.disable();
      this.eventService.getParticipants(this.id).subscribe((response) => {
        this.participants = response.data;
      });
    });
  }
  get listPrerequis() {
    return this.form.controls['prerequis'] as FormArray;
  }
  confirmParticipation(userID: string) {
    this.eventService
      .confirmParticipation(this.id, userID)
      .subscribe((response) => {
        this.addedMember = true;
        this.event.participants.map((participant) => {
          if (participant.user_id === userID) participant.participated = true;
        });
        let timeout = setTimeout(() => {
          this.addedMember = false;
          clearTimeout(timeout);
        }, 3000);
      });
  }
  saveImage() {
    if (this.file != undefined) {
      this.cloudinary.getSignature('events').subscribe((response) => {
        const formData = new FormData();
        formData.append('file', <File>this.file);
        this.cloudinary
          .uploadToCloud(formData, 'events', response)
          .subscribe((response: any) => {
            const link = response.secure_url;
            this.eventService
              .uploadImage(this.id, response.secure_url)
              .subscribe((response) => {
                this.file = undefined;
                this.edit = false;
                this.saved = true;
                this.event.picture = link;
                let timeout = setTimeout(() => {
                  this.saved = false;
                  clearTimeout(timeout);
                }, 3000);
              });
          });
      });
    }
  }
  handleImage(event: any) {
    this.file = event.target.files[0];
  }
  handleEdit() {
    this.edit = !this.edit;
    if (this.edit) this.form.enable();
    else {
      this.form.disable();
      this.form.reset();
    }
  }
  handleSave() {
    this.form
      .get('ended')
      ?.setValue(this.form.get('ended')?.value === 'true' ? true : false);
    this.eventService
      .editEvent(this.id, this.form.value)
      .subscribe((response) => {
        this.event = { ...this.form.value, picture: this.event.picture };
        this.edit = false;
        this.saved = true;
        let timeout = setTimeout(() => {
          this.saved = false;
          clearTimeout(timeout);
        }, 3000);
      });
  }
  handleDelete() {
    if (!this.confiremd) this.confiremd = true;
    else {
      this.eventService.deleteEvent(this.id).subscribe((response) => {
        this.router.navigateByUrl('/admin/events');
      });
    }
  }
  handleEndEvent() {
    this.eventService.endEvent(this.id).subscribe((response) => {
      this.event.ended = true;
      this.form.get('ended')?.setValue(true);
    });
  }
  exist(p: string): boolean {
    let index = 0;
    while (index < this.event.participants.length) {
      if (
        this.event.participants[index].user_id == p &&
        this.event.participants[index].participated == true
      )
        return true;
      else index++;
    }
    return index < this.event.participants.length;
  }
}
