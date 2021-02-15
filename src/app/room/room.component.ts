import { Component, OnInit } from '@angular/core';
import Webex from 'webex';
import { WebexService } from '../webex.service';

@Component({
  selector: 'app-webex',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  webex:any;
  token:any;
  roomName: string;
  createdRoomId: string;
  addUser: string;
  removeUser: string;
  message: string;

  constructor(private webexService: WebexService) {
  }

  ngOnInit(): void {
    this.webexService.performLogin();
    this.token = localStorage.getItem("webex_token");
    console.log("Generated token: " + this.token);
    this.initializeWebexObjectWithClientToken();
  }

  initializeWebexObjectWithClientToken() {
    console.log(this.token);
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        }
      },
      credentials: {
        access_token: this.token
      }
    });
  }

  // async onGetMe() {
  //   const response = await this.webex.people.get('me');
  //   debugger;
  // }

  // async onRegister() {
  //   try {
  //     await this.webex.meetings.register();
  //     this.registered = true;
  //   } catch (error) {
  //     window.alert(error);
  //   }
  // }

  // async onUnregister() {
  //   try {
  //     await this.webex.meetings.unregister();
  //     this.registered = false;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async onSyncMeetings() {
  //   try {
  //     this.syncStatus = 'SYNCING';
  //     await this.webex.meetings.syncMeetings();
  //     this.syncStatus = 'SYNCED';
  //   } catch (error) {
  //     this.syncStatus = 'ERROR';
  //     console.error(error);
  //   }
  // }

  // async onCreateMeeting(destination) {
  //   try {
  //     this.currentMeeting = await this.webex.meetings.create(destination);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // printMeeting() {
  //   if (this.currentMeeting) {
  //     return this.currentMeeting.id;
  //   }
  //   return 'No Meeting';
  // }

  createRoom() {
    this.webexService.createRoom(this.webex, this.roomName);
  }

  addUserToRoom() {
    this.webexService.addUserToRoom(this.webex, this.addUser);
    // this.webex.memberships.create(this.getMembershipObject(this.createdRoomId, this.addUser));
  }

  removeRoom() {
    this.webexService.removeRoom(this.webex);
  }

  removeUserFromRoom() {
    // console.log(this.getMembershipObject(this.createdRoomId, this.removeUser));
    // this.webex.memberships.remove(this.getMembershipObject(this.createdRoomId, this.removeUser));
  }

  sendMessageToRoom() {
    this.webexService.sendMessageToRoom(this.webex, this.message);
  }

  getMembershipObject(roomId, user) {
    let wbxMember = {
      personEmail : user,
      roomId: roomId
    }
    return wbxMember;
  }
  
}
