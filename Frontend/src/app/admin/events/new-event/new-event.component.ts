import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { EventsService } from 'src/app/services/events/events.service';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
})
export class NewEventComponent implements OnInit {
  form!: FormGroup;
  error: boolean = false;
  added: boolean = false;
  file!: File | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private couldinary: CloudinaryService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required]],
      descreption: ['', [Validators.required]],
      price: [0, [Validators.required, CustomValidator.numeric]],
      reward_point: [0, [Validators.required, CustomValidator.numeric]],
      date: this.formBuilder.nonNullable.group({
        date_start: ['', [Validators.required]],
        date_end: ['', [Validators.required]],
      }),
      ended: false,
      categorie: [
        'formation',
        [Validators.required, CustomValidator.eventCategorie],
      ],
      prerequis: this.formBuilder.array([]),
    });
  }
  get listePrerquis() {
    return this.form.controls['prerequis'] as FormArray;
  }
  addPrerequis() {
    this.listePrerquis.push(
      new FormControl('', [Validators.required, CustomValidator.strings])
    );
  }
  deletePrerequis(index: number) {
    this.listePrerquis.removeAt(index);
  }
  handleImage(event : any) {
    this.file = event.target.files[0]
  }
  handleSubmit() {
    if (this.form.valid && this.form.touched && this.file!=undefined) {
      this.eventService.addNewEvent(this.form.value).subscribe(
        (response) => {
          const event_id = response.data._id;
          this.couldinary
            .getSignature('events')
            .subscribe((response) => {
              const formData = new FormData();
              formData.append('file', <File>this.file);
              this.couldinary
                .uploadToCloud(formData, 'events', response)
                .subscribe((response: any) => {
                  this.eventService
                    .uploadImage(event_id, response.secure_url)
                    .subscribe((response) => {
                      this.added = true;
                      setTimeout(() => (this.added = false), 3000);
                      this.file = undefined ; 
                      this.form.reset()
                    });
                });
            });
        },
        (err) => {
          this.error = true;
          setTimeout(() => (this.error = false), 3000);
        }
      );
    } else console.log(this.form);
  }
}
