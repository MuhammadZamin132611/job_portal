// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ChatbuddyComponent } from './chatbuddy.component';

// describe('ChatbuddyComponent', () => {
//   let component: ChatbuddyComponent;
//   let fixture: ComponentFixture<ChatbuddyComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ChatbuddyComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ChatbuddyComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ChatbuddyComponent } from './chatbuddy.component';
import { TestScheduler } from 'rxjs/testing';
import { fromEvent } from 'rxjs';

describe('ChatbuddyComponent', () => {
  let component: ChatbuddyComponent;

  beforeEach(() => {
    component = new ChatbuddyComponent();
  });

  afterEach(() => {
    component.subscriptions.forEach(sub => sub.unsubscribe());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set online and log "Online..." when onlineEvent fires', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(helpers => {
      const { expectObservable } = helpers;
      const onlineEvent$ = fromEvent(window, 'online');
      onlineEvent$.subscribe();

      component.ngOnInit();

      expectObservable(onlineEvent$).toBe('a', {a: undefined});
      expect(component.connectionStatusMessage).toBe('connected');
      expect(component.connectionStatus).toBe('online');     
      expect(console.log).toHaveBeenCalledWith('Online...');
    });
  });

  it('should set offline and log "Offline..." when offlineEvent fires', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(helpers => {
      const { expectObservable } = helpers;
      const offlineEvent$ = fromEvent(window, 'offline');
      offlineEvent$.subscribe();

      component.ngOnInit();

      expectObservable(offlineEvent$).toBe('a', {a: undefined});
      expect(component.connectionStatusMessage).toBe('No internet connection! ');
      expect(component.connectionStatus).toBe('offline');
      expect(console.log).toHaveBeenCalledWith('Offline...');
    });
  });
});

