import { Injectable } from '@angular/core';
import Webex from 'webex';

@Injectable({
  providedIn: 'root'
})
export class WebexService {
  webex:any;
  createdRoomId:string;

  constructor() { }

  performLogin() {
    let redirect_uri = "http://localhost:4200";
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB'
        },
        credentials: {
          client_id: 'C363c710f07a19092b369a1006c6a022646e76bc3a04f321e3d9924281813292a',
          redirect_uri: redirect_uri,
          scope: 'spark:all spark:kms'
        }
      }
    });
    this.listenForWebex(); 
  }

  async listenForWebex() {
    this.webex.once(`ready`, () => {
      console.log(this.webex.canAuthorize);
      console.log("READY", this.webex.credentials.supertoken)
      if (this.webex.canAuthorize){
        localStorage.setItem('webex_token', this.webex.credentials.supertoken.access_token)
      } else {
        this.webex.authorization.initiateLogin();
      }
    });
  }

  async createRoom(webexInstance:any, roomName: string) {
    this.createdRoomId = await webexInstance.rooms.create({ title: roomName })
      .then(function (room) {
        console.log(room.title);
        // console.log(room.id);
        return room.id;
      });
      console.log(this.createdRoomId);
      
  }

  addUserToRoom(webexInstance:any,newUser:string) {
    webexInstance.memberships.create(this.getMembershipObject(this.createdRoomId, newUser));
  }

  removeRoom(webexInstance:any) {
    webexInstance.rooms.remove(this.createdRoomId);
  }

  sendMessageToRoom(webexInstance:any, message:string) {
    console.log("Room id before message: " + this.createdRoomId);
    webexInstance.messages.create({
        text: message,
        roomId: this.createdRoomId
      })
  }

  getMembershipObject(roomId:string, user:string) {
    let wbxMember = {
      personEmail : user,
      roomId: roomId
    }
    return wbxMember;
  }
}
