import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from "../../../shared/services/profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../shared/services/alert.service";
import {User} from "../../../shared/interfaces/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit, OnDestroy {

  @ViewChild('input') inputRef: ElementRef

  form: FormGroup;
  submitted = false;
  image: File;
  imagePreview: string | ArrayBuffer = ''
  user: User;
  userData = true;
  profileSubscription: Subscription;
  baseDataForm: FormGroup;

  constructor(private profileService: ProfileService,
              private alert: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ])
    });

    this.baseDataForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })

    this.form.disable();
    this.fetch();
  }

  fetch() {
    this.profileSubscription = this.profileService.fetch().subscribe(
      user => {
          if (user) {
            this.user = user;
            this.form.patchValue({
              name: user[0].name
            })
            this.baseDataForm.patchValue({
              email: user[0].email,
              password: user[0].password
            })
            this.imagePreview = 'http://localhost:5000/' + user[0].image
          }
          this.form.enable();
        },
        error => { this.alert.danger(error.error.message) })
  }

  submit() {

    if (this.form.invalid) {
      return
    }

    this.form.disable();
    this.submitted = true;

    this.profileService.create(this.form.value.name, this.image).subscribe(
      user => {
        this.user = user
        this.alert.warning('Changes saved');
        this.form.enable();
      },
      error => {
        this.alert.danger(error.error.message);
        this.form.enable();
      }
    )
  }

  fileInput() {
    this.inputRef.nativeElement.click();
  }

  fileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file);
  }

  viewUserData() {
    this.userData ? this.userData = false : this.userData = true
  }

  ngOnDestroy() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe()
    }
  }

  baseDataSubmit() {
    if (this.baseDataForm.invalid) {
      return
    }

    this.baseDataForm.disable();
    this.submitted = true;

    const user: User = {
      email: this.baseDataForm.value.email,
      password: this.baseDataForm.value.password
    }

    this.profileSubscription = this.profileService.update(user).subscribe(
      user => {
        this.user = user;
        this.alert.warning('Changes saved');
        this.baseDataForm.enable();
      },
      error => {
        this.alert.danger(error.error.message);
        this.baseDataForm.enable();
      }
    )
  }
}
