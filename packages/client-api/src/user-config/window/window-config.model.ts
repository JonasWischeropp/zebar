import { z } from 'zod';

import { GroupConfigSchema } from './group-config.model';
import { BaseElementConfigSchema } from './base-element-config.model';
import { Prettify } from '~/utils';
import { BooleanLikeSchema, withDynamicKey } from '../shared';
import { ZOrderSchema } from './z-order.model';

export const WindowConfigSchemaP1 = BaseElementConfigSchema.extend({
  class_names: z.array(z.string()).default(['window']),
  position_x: z.coerce.number(),
  position_y: z.coerce.number(),
  width: z.coerce.number().min(1),
  height: z.coerce.number().min(1),
  z_order: ZOrderSchema,
  show_in_taskbar: BooleanLikeSchema.optional(),
  resizable: BooleanLikeSchema.optional(),
});

export type WindowConfigP1 = Prettify<
  z.infer<typeof WindowConfigSchemaP1>
>;

// Add `group/**` keys to schema.
// TODO: Should be able to have `template/` as a child of window config.
export const WindowConfigSchema = withDynamicKey(WindowConfigSchemaP1, {
  isKey: (key: string): key is `group/${string}` =>
    key.startsWith('group/'),
  schema: GroupConfigSchema,
});

export type WindowConfig = Prettify<z.infer<typeof WindowConfigSchema>>;
