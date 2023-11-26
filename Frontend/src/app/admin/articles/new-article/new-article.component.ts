import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticlesService,
    private cloudinary: CloudinaryService
  ) {}
  form!: FormGroup;
  published: boolean = false; // Notification Trigger
  file!: File | undefined;
  ngOnInit(): void {
    this.form = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }
  handleImage(event: any) {
    this.file = event.target.files[0];
  }

  handleSubmit() {
    if (this.form.valid && this.form.touched) {
      this.articleService.postArticle(this.form.value).subscribe((response) => {
        const article_id = response.data._id;
        if (this.file != undefined) {
          this.cloudinary.getSignature('articles').subscribe((response) => {
            const formData = new FormData();
            formData.append('file', <File>this.file);
            this.cloudinary
              .uploadToCloud(formData, 'articles', response)
              .subscribe((resposne: any) => {
                this.articleService
                  .uploadImage(article_id, resposne.secure_url)
                  .subscribe((response) => {
                    this.published = true;
                    this.form.reset();
                    let timeout = setTimeout(() => {
                      this.published = false;
                      clearTimeout(timeout);
                    }, 3000);
                  });
              });
          });
        }
      });
    }
  }
}
