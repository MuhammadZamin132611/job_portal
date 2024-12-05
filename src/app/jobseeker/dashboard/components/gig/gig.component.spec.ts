// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { GigComponent } from './gig.component';

// describe('GigComponent', () => {
//   let component: GigComponent;
//   let fixture: ComponentFixture<GigComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ GigComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(GigComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fromEvent, Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { GigComponent } from './gig.component';
import { EventEmitter } from '@angular/core';

describe('GigComponent', () => {
  let component: GigComponent;
  let fixture: ComponentFixture<GigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GigComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.subscriptions.forEach((s) => s.unsubscribe());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have onlineEvent and offlineEvent initialized', () => {
    expect(component.onlineEvent instanceof Observable).toBeTrue();
    expect(component.offlineEvent instanceof Observable).toBeTrue();
  });

  it('should have subscriptions array initialized', () => {
    expect(component.subscriptions instanceof Array).toBeTrue();
    expect(component.subscriptions.length).toBe(0);
  });

  it('should subscribe to onlineEvent properly', () => {
    const onlineSpy = spyOn(console, 'log');
    const event = new Event('online');
    // component.onlineEvent.next(event);
    const offlineEventEmitter = new EventEmitter();
    offlineEventEmitter.emit('online');

    expect(component.connectionStatusMessage).toBe('connected');
    expect(component.connectionStatus).toBe('online');
    expect(onlineSpy).toHaveBeenCalledWith('Online...');
  });

  it('should subscribe to offlineEvent properly', () => {
    const offlineSpy = spyOn(console, 'log');
    const event = new Event('offline');
    // component.offlineEvent.next(event);
    const offlineEventEmitter = new EventEmitter();
    offlineEventEmitter.emit('offline');
    expect(component.connectionStatusMessage).toBe('No internet connection! ');
    expect(component.connectionStatus).toBe('offline');
    expect(offlineSpy).toHaveBeenCalledWith('Offline...');
  });

  it('should unsubscribe from all subscriptions', () => {
    spyOn(component.subscriptions[0], 'unsubscribe');
    spyOn(component.subscriptions[1], 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
    expect(component.subscriptions[1].unsubscribe).toHaveBeenCalled();
  });
});
