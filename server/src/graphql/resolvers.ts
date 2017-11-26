import {getManager} from "typeorm"
import { find, filter } from "lodash"
import { User } from '../entity/User'


export default {
  Query: {
    users: () => getManager().getRepository(User).find(),
  }
}
