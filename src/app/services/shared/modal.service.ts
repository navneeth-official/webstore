import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private overlayRef?: OverlayRef;
  private currentTemplate?: TemplateRef<any>;
  private closeTimeout?: any;

  constructor(private overlay: Overlay) {}

  open(
    template: TemplateRef<any>,
    vcr: ViewContainerRef,
    closeDelay: number = 150
  ): void {

    this.clearTimeout();

    if (this.overlayRef && this.currentTemplate === template) {
      return;
    }

    if (this.overlayRef) {
      this.close(0);
    }

    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({ positionStrategy });
    const portal = new TemplatePortal(template, vcr);
    this.overlayRef.attach(portal);
    this.currentTemplate = template;
  }

  close(delay: number = 150): void {
    this.clearTimeout();

    this.closeTimeout = setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.detach();
        this.overlayRef = undefined;
        this.currentTemplate = undefined;
      }
    }, delay);
  }


  keepOpen(): void {
    this.clearTimeout();
  }


  isOpen(): boolean {
    return !!this.overlayRef;
  }

  private clearTimeout(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }
  }

  destroy(): void {
    this.close(0);
  }
}

