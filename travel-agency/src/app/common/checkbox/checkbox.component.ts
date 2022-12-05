import { Component, Input, Output, EventEmitter } from '@angular/core';
import { 
  ControlContainer,
  FormGroupDirective 
} from '@angular/forms'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  viewProviders : [{
    provide : ControlContainer,
    useExisting : FormGroupDirective
  }]
})
export class CheckboxComponent {
  @Input() controlName : string = ""
  @Input() label: string = ""
  @Input() value: any = ""

  @Output() handleChange: EventEmitter<any> = new EventEmitter();

  onChange(event : any) {
    console.log(event)
    this.handleChange.emit( event )
  }
}
