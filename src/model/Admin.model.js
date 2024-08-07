import { database } from '../database/db.js'
import { DataTypes, Op } from 'sequelize'

const Admin = database.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  },
  {
    timestamps: false
  }
)

const adminAuth = async (cpf, token) => {
  try {
    const admin = await Admin.findOne({
      where: {
        [Op.and]: [{ cpf }, { token }]
      },
      attributes: ['name']
    })
    if (admin) {
      return { Deletado: admin }
    } else {
      return null
    }
  } catch (error) {
    return error
  }
}

export { Admin, adminAuth }
