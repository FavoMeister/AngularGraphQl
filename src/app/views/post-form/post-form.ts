import { Component, OnDestroy, OnInit } from '@angular/core';
import { Posts } from '../../core/services/posts';
import { filter, Subscription, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  standalone: false,
  templateUrl: './post-form.html',
  styleUrl: './post-form.scss'
})
export class PostForm implements OnInit, OnDestroy{

  postId: string | null = null;
  sub!: Subscription;

  postForm!: FormGroup<{
    title: FormControl<string | null>
    views: FormControl<number | null>
    comment: FormControl<string | null>
  }> /* = new FormGroup({
    titile: new FormControl(''),
    views: new FormControl(null),
    comment: new FormControl('')
  }) */

  constructor(private postsService: Posts){}

  ngOnInit(): void {
      this.postsService.postId$.pipe(
        tap(postId => {
          this.postId = postId;

          if (!postId) {
            this.postForm = new FormGroup({
              title: new FormControl(''),
              views: new FormControl<number | null>(null),
              comment: new FormControl('')
            });
          }
        }),
        filter(postId => !!postId),
        switchMap(postId => this.postsService.getPost(postId as string))
      ).subscribe(postData => {
        this.postForm = new FormGroup({
          title: new FormControl(postData.data.Post.title),
          views: new FormControl(postData.data.Post.views),
          comment: new FormControl(postData.data.Post.comment)
        });
      })
  }

  get controls() {
    return this.postForm.controls;
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  onSubmit() {
    const {title, views, comment} = this.postForm.getRawValue();

    if (this.postId) {
      this.postsService.updatePost(this.postId, title as string, views as number, comment as string).subscribe()

      return;
    }

    this.postsService.createPost(title as string, views as number, comment as string).subscribe()
  }

  clearEdit() {
    this.postsService.postId$.next(null);
  }
}
