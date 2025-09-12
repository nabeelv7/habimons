import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  // extra
  timezone: text("timezone").default("Asia/Karachi"),
  gems: integer("gems").default(0).notNull(),
  profile: text("profile").default("private").notNull(),
})

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export const habitsTable = sqliteTable("habits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  days: integer("days").notNull(),
  user_id: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: integer("created_at").$default(() => Date.now()).notNull(),
  updatedAt: integer("updated_at")
    .$default(() => Date.now())
    .$onUpdate(() => Date.now())
    .notNull(),
})

export const daysTable = sqliteTable("days", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date").notNull(),
  habit_id: integer("habit_id").references(() => habitsTable.id, { onDelete: "cascade" }).notNull(),
  createdAt: integer("created_at").$default(() => Date.now()).notNull(),
  updatedAt: integer("updated_at")
    .$default(() => Date.now())
    .$onUpdate(() => Date.now())
    .notNull(),
})

export const habimonsTable = sqliteTable("habimons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  image: text("image").notNull(),
  price: integer("price").notNull(),
  rarity: text("rarity").notNull(),
  user_id: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: integer("created_at").$default(() => Date.now()).notNull(),
  updatedAt: integer("updated_at")
    .$default(() => Date.now())
    .$onUpdate(() => Date.now())
    .notNull(),
})

export const marketPlaceTable = sqliteTable("marketplace", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  image: text("image").notNull(),
  price: integer("price").notNull(),
  rarity: text("rarity").notNull(),
  bio: text("bio").notNull(),
  createdAt: integer("created_at").$default(() => Date.now()).notNull(),
  updatedAt: integer("updated_at")
    .$default(() => Date.now())
    .$onUpdate(() => Date.now())
    .notNull(),
})