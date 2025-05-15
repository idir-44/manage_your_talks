"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Textarea } from "@/components/atoms/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/molecules/select"
import { RadioGroup, RadioGroupItem } from "@/components/molecules/radio-group"

interface TalkFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function TalkForm({ initialData, onSubmit, onCancel }: TalkFormProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    title: initialData?.title || "",
    topic: initialData?.topic || "",
    duration: initialData?.duration || 60,
    level: initialData?.level || "intermediate",
    description: initialData?.description || "",
    status: initialData?.status || "pending",
    submittedAt: initialData?.submittedAt || new Date().toISOString(),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleDurationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, duration: Number.parseInt(value) }))

    // Clear error when field is edited
    if (errors.duration) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.duration
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.topic) {
      newErrors.topic = "Topic is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 50) {
      newErrors.description = "Description should be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a clear, specific title for your talk"
            className={errors.title ? "border-destructive" : ""}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">
            Topic <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.topic} onValueChange={(value) => handleSelectChange("topic", value)}>
            <SelectTrigger id="topic" className={errors.topic ? "border-destructive" : ""}>
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="nextjs">Next.js</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="ai">AI & Machine Learning</SelectItem>
              <SelectItem value="cloud">Cloud Computing</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="mobile">Mobile Development</SelectItem>
            </SelectContent>
          </Select>
          {errors.topic && <p className="text-sm text-destructive">{errors.topic}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <RadioGroup
            value={formData.duration.toString()}
            onValueChange={handleDurationChange}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30" id="duration-30" className="border-primary/40 text-primary" />
              <Label htmlFor="duration-30">30 min</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="60" id="duration-60" className="border-primary/40 text-primary" />
              <Label htmlFor="duration-60">60 min</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="90" id="duration-90" className="border-primary/40 text-primary" />
              <Label htmlFor="duration-90">90 min</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="120" id="duration-120" className="border-primary/40 text-primary" />
              <Label htmlFor="duration-120">120 min</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Experience Level</Label>
          <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)}>
            <SelectTrigger id="level">
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of your talk, including key takeaways for attendees"
            className={`min-h-[150px] ${errors.description ? "border-destructive" : ""}`}
          />
          {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          <p className="text-xs text-muted-foreground">
            Minimum 50 characters. Be specific about what attendees will learn.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
        >
          {initialData ? "Update Talk" : "Submit Talk"}
        </Button>
      </div>
    </form>
  )
}
