import { CommonModule } from '@angular/common'
import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Modal } from 'bootstrap'


@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
})
export class ModalComponent {
    @Input() title = 'Modal Title';
    @Input() modalSize: string | undefined
    @ViewChild('modalElement', { static: true }) modalElement!: ElementRef
    private modalInstance!: Modal

    ngAfterViewInit() {
        this.modalInstance = new Modal(this.modalElement.nativeElement)
    }

    open() {
        this.modalInstance.show()
    }

    close() {
        this.modalInstance.hide()
    }

    confirm() {
        // Custom event or callback could be triggered here
        this.close()
    }
}
