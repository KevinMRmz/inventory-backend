/**
 * @description
 * Creates a new object by excluding specified keys from the original object.
 *
 * @template T
 * The type of the original object.
 * @template Key
 * The union type of keys to be excluded from the original object.
 *
 * @param entity
 * The original object from which keys will be excluded.
 * @param keys
 * An array of keys to be excluded from the original object.
 *
 * @returns
 * A new object that is a copy of the original object excluding the specified keys.
 *
 * @example
 * // Using the exclude function to create a sanitized user object without the 'password' property.
 * const user = await prisma.user.findUnique({ where: 1 });
 * const userWithoutPassword = exclude(user, ['password']);
 *
 */
export function exclude<T, Key extends keyof T>(
  entity: T,
  keys: Key[],
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !(keys as string[]).includes(key)),
  ) as Omit<T, Key>;
}
