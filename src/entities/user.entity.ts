import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
class UserEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({
        type: "varchar",
        length: 64,
    })
    public firstname!: string;

    @Column({
        type: "varchar",
        length: 64,
    })
    public lastname!: string;

    @Column({
        type: "varchar",
        length: 64,
    })
    public email!: string;

    @Column({
        type: "varchar",
    })
    public password?: string;
}

export default UserEntity;
