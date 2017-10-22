import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    DoCheck,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
    ElementRef, ContentChild
} from '@angular/core';

@Component({
    selector: 'app-server-element',
    templateUrl: './server-element.component.html',
    styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

    @Input("serverElement")
    element: {
        type: String,
        name: String,
        content: String
    };

    @Input()
    name: String;

    @ViewChild('heading')
    header: ElementRef;

    @ContentChild('contentParagraph')
    paragraph: ElementRef;

    constructor() {
        console.log('Constructor Called!', this.header);
        // console.log('Text Content!', this.header.nativeElement.value);
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('ngOnChanges Called!', changes, this.header);
        console.log('Text Content!', this.header.nativeElement.outerText);
    }

    ngOnInit() {
        console.log('ngOnInit Called!', this.header);
        console.log('Text Content!', this.header.nativeElement.outerText);
    }

    ngDoCheck() {
        console.log('ngDoCheck Called!', this.header);
        console.log('Text Content!', this.header.nativeElement.outerText);
    }

    ngAfterContentInit() {
        console.log('ngAfterContentInit Called!', this.header);
        console.log('Text Content!', this.header.nativeElement.outerText);
    }

    ngAfterContentChecked() {
        console.log('ngAfterContentChecked Called!', this.header);
        console.log('Text Content!', this.header.nativeElement.outerText);
    }

    ngAfterViewInit() {
        console.log('ngAfterContentInit Called!', this.header);
        console.log('Text Content!', this.header.nativeElement.outerText);
    }

    ngAfterViewChecked() {
        console.log('ngAfterContentChecked Called!', this.header);
        console.log('Text Content!', this.header.nativeElement.outerText);
    }

    ngOnDestroy() {
        console.log('ngOnDestroy Called!', this.header);
        console.log('Text Content!', this.header.nativeElement.outerText);
    }

}
