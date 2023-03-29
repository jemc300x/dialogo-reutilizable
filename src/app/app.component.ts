import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogWithTemplateComponent } from './components/dialog-with-template/dialog-with-template.component';
import { DialogService } from './services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dialog-reutilizable';

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
  });

  private matDialogRef!: MatDialogRef<DialogWithTemplateComponent>;

  constructor(private dialogService: DialogService) {}

  openDialogCustom() {
    this.dialogService
      .openDialogCustom({
        title: 'Title 1',
        content: 'Content 1',
      })
      .afterClosed()
      .subscribe((res) => console.log('Dialog Custom Close', res));
  }

  openDialogCustom2() {
    this.dialogService.openDialogCustom({
      title: 'Title 2',
      content: 'Content 2',
    });
  }

  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openDialogWithTemplate({
      template,
    });

    this.matDialogRef.afterClosed().subscribe((res) => {
      console.log('Dialog With Template Close', res);
      this.formGroup.reset();
    });
  }

  onSave() {
    console.log(this.formGroup.value);
    this.formGroup.reset();
    this.matDialogRef.close();
  }
}
