import { Component, OnInit } from '@angular/core';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-webex',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomName: string;
  createdRoomId: string;
  addUser: string;
  removeUser: string;
  message: string;

  constructor(private webexService: WebexService) {
  }

  ngOnInit(): void {
     this.webexService.initializeWebexObjectWithClientToken();
  }

  createRoom() {
    this.webexService.createRoom(this.roomName);
  }

  addUserToRoom() {
    this.webexService.addUserToRoom(this.addUser);
    // this.webex.memberships.create(this.getMembershipObject(this.createdRoomId, this.addUser));
  }

  removeRoom() {
    this.webexService.removeRoom();
  }

  sendMessageToRoom() {
    this.webexService.sendMessageToRoom(this.message);
  }
  
}
