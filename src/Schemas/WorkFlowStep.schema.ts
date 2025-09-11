import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class WorkFlowStep {
  @Prop({ required: true })
  type: string; // e.g., httpCall, transform, delay

  @Prop()
  system?: string;

  @Prop()
  endpoint?: string;

  @Prop()
  method?: string;

  @Prop({ type: Object })
  transform?: Record<string, string>;
}