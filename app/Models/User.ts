import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Receita from 'App/Models/Receita'
import { hasMany } from '@ioc:Adonis/Lucid/Orm'
import Comentario from './Comentario'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @hasMany(() => Receita)
  public receitas: HasMany<typeof Receita>

  @hasMany(() => Comentario)
  public comentarios: HasMany<typeof Comentario>

}
