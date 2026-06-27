import { IToken } from "../../utils";
import { AbstractRepository } from "../abstraction.respository";
import { Token } from "./token.model";

export class TokenRepository extends AbstractRepository<IToken>{
 constructor(){
    super(Token)
 }   
}