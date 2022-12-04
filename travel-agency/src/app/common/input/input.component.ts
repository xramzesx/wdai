import { 
  Component, 
  Input, 
  ComponentFactoryResolver, 
  Optional, 
  ViewContainerRef,
  AfterViewInit 
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
  
  @Input() placeholder: string = ""
  @Input() options : string[] = []

  @Input() min : any = ''
  @Input() max : any = ''

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
