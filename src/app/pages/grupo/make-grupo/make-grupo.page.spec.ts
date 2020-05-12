import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MakeGrupoPage } from './make-grupo.page';

describe('MakeGrupoPage', () => {
  let component: MakeGrupoPage;
  let fixture: ComponentFixture<MakeGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MakeGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
