import { 
  Component, 
  EventEmitter, 
  Input,
  Output
} from '@angular/core';
import { 
  ControlContainer,
  FormGroupDirective 
} from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders : [{
    provide : ControlContainer,
    useExisting : FormGroupDirective
  }]
})
export class InputComponent {
  @Input() controlName : string = ""
  @Input() type : string = "text"
  @Input() label: string = ""
  
  @Input() placeholder: string | number = ""
  @Input() options : string[] = []

  @Input() min : any = ''
  @Input() max : any = ''
  @Input() maxLength : any = ''

  @Input() rows : number = 1

  @Input() value : any = ''

  @Output() onInput : EventEmitter<any> = new EventEmitter()

  handleInput( event : Event ) {
    this.onInput.emit(event)
  }

  getType() {
    switch ( this.type ) {
      case 'textarea':
        return 'textarea';
      case 'select':
        return 'select';
      default:
        return 'default'
    }
  }
}
