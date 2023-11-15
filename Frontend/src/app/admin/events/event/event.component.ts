import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { EventsService } from 'src/app/services/events/events.service';
import { Event } from 'src/app/shared/models/Event.model';
import { User } from 'src/app/shared/models/User.model';

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
  constructor(
    private eventService: EventsService,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.eventService.getSingleEvent(this.id).subscribe((response) => {
      this.event = response.data;
      this.form = this.formBuilder.nonNullable.group({
        title: { value: response.data.title, disabled: true },
        descreption: { value: response.data.descreption, disabled: true },
        price: { value: response.data.price, disabled: true },
        reward_point: { value: response.data.reward_point, disabled: true },
        date: this.formBuilder.group({
          date_start: { value: response.data.date.date_start, disabled: true },
          date_end: { value: response.data.date.date_end, disabled: true },
        }),
        ended: { value: response.data.ended, disabled: true },
        prerequis: this.formBuilder.array(response.data.prerequis).disabled,
        categorie: { value: response.data.categorie, disabled: true },
      });
      this.eventService.getParticipants(this.id).subscribe((response) => {
        console.log(response);
        this.participants = response.data;
      });
    });
  }
  confirmParticipation(userID: string) {
    this.eventService
      .confirmParticipation(this.id, userID)
      .subscribe((response) => {
        console.log(response);
      });
  }
  handleEdit() {
    this.edit = !this.edit;
    if (this.edit) {
      for (const key in this.form.controls) {
        this.form.get(key)?.enable();
      }
    } else {
      for (const key in this.form.controls) {
        this.form.reset();
        this.form.get(key)?.disable();
      }
    }
  }
  handleSave() {
    this.form
      .get('ended')
      ?.setValue(this.form.get('ended')?.value === 'true' ? true : false);
    this.eventService
      .editEvent(this.id, this.form.value)
      .subscribe((response) => {
        this.event = this.form.value;
        this.edit=false
      });
  }
  handleDelete() {
    this.eventService.deleteEvent(this.id).subscribe(response=> {
      this.router.navigateByUrl('/admin/events')
    })
  }
}
